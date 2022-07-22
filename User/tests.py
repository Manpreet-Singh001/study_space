from django.test import TestCase
from django.test import Client


class SignUpTestCase(TestCase):

    def setUp(self):
        self.c = Client()

    def test_valid_input(self):
        response = self.c.post('/user/signup/', {
            'username': 'manpreet',
            'password': '123',
            'email': 'test@gmail.com'
        }, content_type="application/json")

        self.assertEqual(response.status_code, 200)

    def test_invalid_input_missing_field(self):
        response = self.c.post('/user/signup/', {
            'username': 'manpreet',
            'email': 'test@gmail.com'
        }, content_type="application/json")

        self.assertNotEqual(response.status_code, 200)
