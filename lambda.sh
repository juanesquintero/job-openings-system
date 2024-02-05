pip install -t lib -r requirements.txt

(cd lib; zip ../lambda_function.zip -r .)

zip lambda_function.zip -u .env

mv lambda_function.zip api/

cd api

zip lambda_function.zip -u ./*

cd ..