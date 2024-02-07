pip install -t lib -r requirements.txt

(cd lib; zip ../lambda_function.zip -r .)

mv lambda_function.zip api/ && cd api

zip lambda_function.zip -u ./*.py

mv lambda_function.zip ../

cd ..