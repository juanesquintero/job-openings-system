echo "\nInstalling packages...\n";
python3.12 -m pip  install --platform manylinux2014_x86_64 -t lib -r requirements.txt --only-binary=:all: --upgrade;

echo "\nZipping packages...\n";
(cd lib; zip ../lambda_function.zip -r .);

echo "\nZipping source code...\n";
(cd api; zip ../lambda_function.zip -u ./*.py);

echo "\nRemoving temp lib folder...\n";
rm -rf ./lib;