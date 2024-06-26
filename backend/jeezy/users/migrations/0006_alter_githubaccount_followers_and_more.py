# Generated by Django 4.2.11 on 2024-05-05 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_githubaccount_alter_user_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='githubaccount',
            name='followers',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='githubaccount',
            name='following',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='githubaccount',
            name='owned_private_repos',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='githubaccount',
            name='public_repos',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='githubaccount',
            name='total_private_repos',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
