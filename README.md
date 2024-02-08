Commands to generate AWS Lambda function zip

    # Install/Generate dependencies packages
    python3.12 -m pip  install --platform manylinux2014_x86_64 -t lib -r requirements.txt --only-binary=:all: --upgrade;

    # Compress dependencies packages
    (cd lib; zip ../lambda_function.zip -r .);

    # Compress the source code
    (cd api; zip ../lambda_function.zip -u ./*.py);



Videos for AWS deployment

    AWS Lambda function
    https://youtu.be/7-CvGFJNE_o

    AWS RDS database
    https://youtu.be/I_fTQTsz2nQ

