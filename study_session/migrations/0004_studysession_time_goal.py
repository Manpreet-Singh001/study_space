# Generated by Django 4.0.6 on 2022-07-24 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('study_session', '0003_topic_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='studysession',
            name='time_goal',
            field=models.IntegerField(default=20),
        ),
    ]
