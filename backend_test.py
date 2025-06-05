import requests
import unittest
import os
import sys
import json
from datetime import datetime

class TeraBoxAPITester(unittest.TestCase):
    def __init__(self, *args, **kwargs):
        super(TeraBoxAPITester, self).__init__(*args, **kwargs)
        # Get the backend URL from the frontend .env file
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    self.base_url = line.strip().split('=')[1].strip('"\'')
                    break
        
        if not hasattr(self, 'base_url'):
            raise ValueError("Could not find REACT_APP_BACKEND_URL in frontend/.env")
        
        print(f"Using backend URL: {self.base_url}")
        
        # Ensure the URL has no trailing slash
        self.base_url = self.base_url.rstrip('/')
        
    def test_01_root_endpoint(self):
        """Test the root API endpoint"""
        print("\n🔍 Testing root API endpoint...")
        url = f"{self.base_url}/api/"
        
        try:
            response = requests.get(url)
            self.assertEqual(response.status_code, 200, f"Expected status code 200, got {response.status_code}")
            data = response.json()
            self.assertEqual(data.get("message"), "Hello World", "Expected 'Hello World' message")
            print("✅ Root API endpoint test passed")
        except Exception as e:
            self.fail(f"❌ Root API endpoint test failed: {str(e)}")
    
    def test_02_create_status_check(self):
        """Test creating a status check"""
        print("\n🔍 Testing status check creation...")
        url = f"{self.base_url}/api/status"
        client_name = f"test_client_{datetime.now().strftime('%Y%m%d%H%M%S')}"
        data = {"client_name": client_name}
        
        try:
            response = requests.post(url, json=data)
            self.assertEqual(response.status_code, 200, f"Expected status code 200, got {response.status_code}")
            result = response.json()
            self.assertEqual(result.get("client_name"), client_name, f"Expected client_name {client_name}")
            self.assertIn("id", result, "Response should contain an 'id' field")
            self.assertIn("timestamp", result, "Response should contain a 'timestamp' field")
            print("✅ Status check creation test passed")
            return result.get("id")
        except Exception as e:
            self.fail(f"❌ Status check creation test failed: {str(e)}")
    
    def test_03_get_status_checks(self):
        """Test getting status checks"""
        print("\n🔍 Testing get status checks...")
        url = f"{self.base_url}/api/status"
        
        try:
            response = requests.get(url)
            self.assertEqual(response.status_code, 200, f"Expected status code 200, got {response.status_code}")
            result = response.json()
            self.assertIsInstance(result, list, "Expected a list of status checks")
            print(f"✅ Get status checks test passed - Retrieved {len(result)} status checks")
        except Exception as e:
            self.fail(f"❌ Get status checks test failed: {str(e)}")

def run_tests():
    # Create a test suite
    suite = unittest.TestSuite()
    
    # Add the tests to the suite
    suite.addTest(TeraBoxAPITester('test_01_root_endpoint'))
    suite.addTest(TeraBoxAPITester('test_02_create_status_check'))
    suite.addTest(TeraBoxAPITester('test_03_get_status_checks'))
    
    # Run the tests
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    # Return 0 if all tests passed, 1 otherwise
    return 0 if result.wasSuccessful() else 1

if __name__ == "__main__":
    sys.exit(run_tests())