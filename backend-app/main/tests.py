from django.contrib.auth.models import User
from django.urls import reverse
from .models import Task
from rest_framework.test import APITestCase, APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone

class TaskModelTests(APITestCase):
    def setUp(self):
        self.client = APIClient()

        self.user = User.objects.create_user(
            username='user', email='test@example.com', password='1234567890!'
        )
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access_token}")

        self.task = Task.objects.create(
            title='Initial Task',
            desc='Initial Task Description',
            status='New',
            priority='Low',
            deadline = timezone.now(),
            user=self.user
        )

    def test_create_task(self):
        response = self.client.post(reverse('task-list'), {
            'title': 'Test Task',
            'desc': 'Description of the test task',
            'status': 'New',
            'priority': 'Medium',
            'deadline': timezone.now()
        })
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Task.objects.count(), 2)
        self.assertEqual(Task.objects.last().title, 'Test Task')

    def test_update_task_status(self):
        url = reverse('task-detail', args=[self.task.id])
        response = self.client.patch(url, {'status': 'Pending'})
        self.assertEqual(response.status_code, 200)
        self.task.refresh_from_db()
        self.assertEqual(self.task.status, 'Pending')

    def test_update_task_priority(self):
        url = reverse('task-detail', args=[self.task.id])
        response = self.client.patch(url, {'priority': 'High'})
        self.assertEqual(response.status_code, 200)
        self.task.refresh_from_db()
        self.assertEqual(self.task.priority, 'High')

    def test_invalid_task_creation(self):
        response = self.client.post(reverse('task-list'), {
            'title': '',
            'desc': 'Description without title',
            'status': 'INVALID_STATUS',
            'priority': 'Medium',
            'deadline': timezone.now()
        })
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Task.objects.count(), 1)

    def test_invalid_delete_task(self):
        url = reverse('task-detail', args=[3])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 404)
        self.assertEqual(Task.objects.count(), 1)

    def test_delete_task(self):
        url = reverse('task-detail', args=[self.task.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Task.objects.count(), 0)
