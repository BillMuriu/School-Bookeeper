from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    help = 'A generic command template for your custom Django command'

    def add_arguments(self, parser):
        # Optional argument
        parser.add_argument(
            '--name',
            type=str,
            help='Specify a name to greet',
        )

    def handle(self, *args, **options):
        name = options['name']
        
        if name:
            # Perform an action using the argument
            self.stdout.write(f'Hello, {name}!')
        else:
            # Default action if no argument is provided
            self.stdout.write('Hello, World!')

        # Example of handling an error
        try:
            # Replace this with your custom logic
            self.stdout.write(self.style.SUCCESS('Command executed successfully'))
        except Exception as e:
            raise CommandError(f'Error: {e}')
