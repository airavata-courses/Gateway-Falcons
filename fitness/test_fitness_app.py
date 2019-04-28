import datetime
import mock
import fitnessapp

test_app = fitnessapp.app
test_client = test_app.test_client()
test_app.testing = True



def test_add_data():
    response = test_client.get('/get')
    assert b'john' in response.data