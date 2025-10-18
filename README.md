# Precy Plastic Wares - Installation Guide


Prerequisites: Python 3.8+ and Git

1. Clone Repository, in terminal type:
      git clone https://github.com/meljz/Precy_Plastic_Wares-.git. Then go to:
      cd Precy_Plastic_Wares-

2. Create Virtual Environment (this is for windows), in terminal type:
      python -m venv venv
      venv\Scripts\activate

3. Install Dependencies, in terminal type:
      pip install django djangorestframework pillow

4. Run Migrations, in terminal install:
      python manage.py migrate

5. Create Admin Account (this is optional, you can just signup then login using the credential if just viewing the site), in terminal type:
      python manage.py createsuperuser

6. Run Server, in terminal type:
      python manage.py runserver

Access the website at http://127.0.0.1:8000/
Admin panel at http://127.0.0.1:8000/admin/
