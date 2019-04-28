import datetime
import mock
import dietapp

test_app = dietapp.app
test_client = test_app.test_client()
test_app.testing = True


@mock.patch('dietapp.add_diet_data')
def test_add_data(add_diet_data):
    response = test_client.get('/add')
    assert b'Added data' in response.data
