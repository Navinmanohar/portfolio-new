"""Run local tests against the backend."""
import subprocess, time, sys, httpx, signal, os

# Start server
os.chdir(os.path.dirname(__file__))
proc = subprocess.Popen(
    ["venv/bin/uvicorn", "app.main:app", "--port", "8000"],
    stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
)
time.sleep(4)

base = "http://localhost:8000"
client = httpx.Client()
results = []

def test(name, status):
    results.append(f"{'PASS' if status else 'FAIL'}: {name}")

# 1. Health
try:
    r = client.get(f"{base}/api/health")
    test("health check", r.status_code == 200 and r.json().get("status") == "ok")
except Exception as e:
    test(f"health check ({e})", False)

# 2. Setup admin
try:
    r = client.post(f"{base}/api/auth/setup", json={"email": "admin@test.com", "password": "Admin@72"})
    test("setup admin", r.status_code == 200 and "access_token" in r.json())
except Exception as e:
    test(f"setup admin ({e})", False)

# 3. Setup duplicate
try:
    r = client.post(f"{base}/api/auth/setup", json={"email": "admin@test.com", "password": "Admin@72"})
    test("setup duplicate rejected", r.status_code == 400)
except Exception as e:
    test(f"setup duplicate ({e})", False)

# 4. Login
token = None
try:
    r = client.post(f"{base}/api/auth/login", json={"email": "admin@test.com", "password": "Admin@72"})
    test("login valid", r.status_code == 200 and "access_token" in r.json())
    if r.status_code == 200:
        token = r.json()["access_token"]
except Exception as e:
    test(f"login valid ({e})", False)

# 5. Login invalid
try:
    r = client.post(f"{base}/api/auth/login", json={"email": "admin@test.com", "password": "wrong"})
    test("login invalid rejected", r.status_code == 401)
except Exception as e:
    test(f"login invalid ({e})", False)

# 6. Analytics (protected)
if token:
    try:
        r = client.get(f"{base}/api/analytics/dashboard", headers={"Authorization": f"Bearer {token}"})
        test("analytics dashboard", r.status_code == 200)
    except Exception as e:
        test(f"analytics dashboard ({e})", False)
else:
    test("analytics dashboard (no token)", False)

# 7. Analytics without auth
try:
    r = client.get(f"{base}/api/analytics/dashboard")
    test("analytics no auth rejected", r.status_code == 403)
except Exception as e:
    test(f"analytics no auth ({e})", False)

proc.send_signal(signal.SIGINT)
proc.wait()

print()
for r in results:
    print(r)
print(f"\n{sum(1 for r in results if r.startswith('PASS'))}/{len(results)} passed")
sys.exit(0 if all(r.startswith("PASS") for r in results) else 1)
