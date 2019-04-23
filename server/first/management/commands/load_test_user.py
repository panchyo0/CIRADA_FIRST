from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User
import uuid
from django.core.management import call_command

"""
load test user account by command

password
    user input password
"""
class Command(BaseCommand):
    help = 'Create CRIADA test users'

    def add_arguments(self, parser):
        parser.add_argument('password', nargs=1, type=str, help='Password assigned to test accounts')

    def handle(self, *args, **options):
        # password = 'qwertyuiop'# uuid.uuid4()
        if options['password']:
            password = (options['password'][0])

            self.create_test_users(password)
            self.stdout.write(self.style.SUCCESS('Successfully created'))

        else:
            self.stdout.write(self.style.ERROR('password is a required parameter'))

    def create_user_profile_pair(self, username, email, password, first_name, last_name):
        user = User.objects.create_user(username, email, password, first_name=first_name, last_name=last_name)

    def create_test_users(self, password):
        user = User.objects.create_superuser('superuser', 'superuser@criada.com', password, first_name='Qi', last_name='Pang')