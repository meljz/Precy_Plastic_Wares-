from django.db import models

# API ENDPOINTS

class Product (models.Model):
    name = models.CharField(max_length=100)
    price = models.CharField(max_length=20)
    image = models.CharField(max_length=200)
    alt = models.CharField(max_length=100)
    color = models.CharField(max_length=50)
    brand = models.CharField(max_length=50)
    quantity = models.IntegerField()

class Customer (models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    contact_number = models.CharField(max_length=20)
    location = models.CharField(max_length=100)

class ContactMessage (models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    date_sent = models.DateTimeField(auto_now_add=True)