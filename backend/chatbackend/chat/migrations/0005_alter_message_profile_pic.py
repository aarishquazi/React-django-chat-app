# Generated by Django 5.1.3 on 2024-12-14 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0004_alter_message_profile_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='profile_pic',
            field=models.ImageField(upload_to='dp_pics'),
        ),
    ]
