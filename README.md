# SGC API 
## (Sistema de Gestion de Convocatorias)


## AWS deployment

### Lambda function zip

Commands to generate 

Install/Generate dependencies packages
```bash
$ python3.12 -m pip  install --platform manylinux2014_x86_64 -t lib -r requirements.txt --only-binary=:all: --upgrade;
```

Compress dependencies packages
```bash
$ (cd lib; zip ../lambda_function.zip -r .);
```

Compress the source code
```bash
$ (cd api; zip ../lambda_function.zip -u ./*.py);
```
### Documentation Videos

AWS Lambda function Tutorial:

https://youtu.be/7-CvGFJNE_o


AWS RDS database Tutorial:

https://youtu.be/I_fTQTsz2nQ

