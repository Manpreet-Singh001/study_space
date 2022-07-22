# Generated by Django 4.0.6 on 2022-07-22 08:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('study_session', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='studysession',
            name='end_time',
            field=models.DateTimeField(null=True),
        ),
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('session_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='study_session.studysession')),
            ],
        ),
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('note', models.TextField()),
                ('topic_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='study_session.topic')),
            ],
        ),
    ]
