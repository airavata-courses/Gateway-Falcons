import datetime
import mock
import fitbitapp

test_app = fitbitapp.app
test_client = test_app.test_client()
test_app.testing = True

def test_sleep_data():
    response = test_client.get('/getsleep')
    assert b'Sleep data added [BLUE DEPLOYMENT]' in response.data

def test_hr_data():
    response = test_client.get('/getheartrate')
    assert b'Heart rate added [BLUE DEPLOYMENT]' in response.data

def test_stat_data():
    response = test_client.get('/getstat')
    assert b'Series data added [BLUE DEPLOYMENT]' in response.data
