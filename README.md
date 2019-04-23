# CIRADA_FIRST
## CIRADA Demo

### Server:
    Build virtual env and install all packages
        virtualenv -p python3 venv
        source venv/bin/activate
        pip install -r requirements.txt
    
    cd server 
    start server(developemt):
        python manage.py runserver
    Administration url
        http://127.0.0.1:8000/admin/
    Browsable API URL
        http://127.0.0.1:8000/api/

### Client
    start client
        cd client/first 
        npm start

### Load data:
    python manage.py load_test_user <password> 
    - example python manage.py load_test_user 12345abcde
    python manage.py load_data <fileName> <-c> <-l 100> 
    ( 
    -c will prevent duplicate when import data. This option is time consuming. Default import will not check.
    -l Indicates the number of FIRST objects to be created. Default will created all.
    )
    - example python manage.py load_data FIRST_data.fit
