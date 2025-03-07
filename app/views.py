from django.shortcuts import render, redirect
from django.http import HttpRequest
from datetime import datetime
from django.contrib.auth.decorators import login_required
from .models import Skill, Achievement

def home(request):
    """Renders the home page."""
    return render(
        request,
        'app/index.html',
        {
            'title':'Welcome',
            'year': datetime.now().year,
        }
    )

def skills(request):
    """Renders the skills page."""
    skills_by_type = {
        'LANG': Skill.objects.filter(skill_type='LANG'),
        'FRAM': Skill.objects.filter(skill_type='FRAM'),
        'TOOL': Skill.objects.filter(skill_type='TOOL'),
        'ADD': Skill.objects.filter(skill_type='ADD')
    }
    
    return render(
        request,
        'app/skills.html',
        {
            'title': 'Skills',
            'year': datetime.now().year,
            'skills': skills_by_type,
        }
    )

def contact(request):
    """Renders the contact page."""
    return render(
        request,
        'app/contact.html',
        {
            'title':'Get in touch',
            'message':'',
            'year':datetime.now().year,
        }
    )

def about(request):
    """Renders the about page."""
    return render(
        request,
        'app/about.html',
        {
            'title':'',
            'message':'',
            'year':datetime.now().year,
        }
    )

def achievements(request):
    projects = Achievement.objects.filter(achievement_type='PROJECT')
    certificates = Achievement.objects.filter(achievement_type='CERTIFICATE')
    badges = Achievement.objects.filter(achievement_type='BADGE')
    
    context = {
        'projects': projects,
        'certificates': certificates,
        'badges': badges,
        'title': 'Achievements'
    }
    return render(request, 'app/achievements.html', context)

@login_required
def menu(request):
    check_employee = request.user.groups.filter(name='employee').exists()

    context = {
            'title':'Main Menu',
            'is_employee': check_employee,
            'year':datetime.now().year,
        }
    context['user'] = request.user

    return render(request,'app/menu.html',context)