# CIRADA_FIRST
## CIRADA Demo

### High Level Design
   [Click To View](https://github.com/panchyo0/CIRADA_FIRST/blob/master/FIRST_High_Level_design.png)
### Server (Django, Django Rest, JWT)
   #### Build virtual env and install all packages
        cd CIRADA_FIRST 
        virtualenv -p python3 venv
        source venv/bin/activate
        pip install -r requirements.txt
        
   #### start server(developemt):
        cd server 
        python manage.py runserver
   #### Administration url
        http://127.0.0.1:8000/admin/
   #### Browsable API URL
        http://127.0.0.1:8000/api/

### Client (Reactjs, Redux)
#### start client
        cd client/first 
        npm start
#### Client URL:
        http://localhost:3000
        
### Demo User
    username: superuser
    password: 1234abcd

### Demo Data
    338.12,11.53,1,Decimal
    22:32:28.800,11:31:48.000,0.25,Sexigessimal

### Load data:
#### python manage.py load_test_user <password> 
    example python manage.py load_test_user 12345abcde
#### python manage.py load_data <fileName> <-c> <-l 100> 
    -c will prevent duplicate when import data. This option is time consuming. Default import will not check.
    -l Indicates the number of FIRST objects to be created. Default will created all.
    
    example python manage.py load_data FIRST_data.fit
