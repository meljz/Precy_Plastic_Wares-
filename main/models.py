from django.db import models
from django.contrib.auth.models import User

# API ENDPOINTS

class Product (models.Model):
    name = models.CharField(max_length=100)
    price = models.CharField(max_length=20)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    alt = models.CharField(max_length=100)
    color = models.CharField(max_length=50)
    brand = models.CharField(max_length=50)
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.name} ({self.brand})"

class Customer (models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    contact_number = models.CharField(max_length=20)
    location = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} ({self.brand})"


class UserProfile(models.Model):   #this is for the signup page's customer information
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gender = models.CharField(max_length=10)
    address = models.CharField(max_length=255)
    contact = models.CharField(max_length=20)
    dob = models.DateField()

    def __str__(self):
        return f"{self.user.username}'s profile"

class ContactMessage (models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    date_sent = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}: {self.message[:30]}..." 