-- table candidatos
CREATE TABLE candidatos (
	nombre VARCHAR (250) NOT NULL,
	correo VARCHAR (250) NOT NULL,
	CONSTRAINT pk_Usuario 
	PRIMARY KEY( correo )
);

-- table perfiles
CREATE TABLE perfiles (
	candidato VARCHAR (250) NOT NULL,
	rasgo VARCHAR (250) NOT NULL,
	calificacion INTEGER NOT NULL,
	justificacion VARCHAR (500) NULL,
	fecha TIMESTAMPTZ NOT NULL,
	CONSTRAINT pk_Perfil 
	PRIMARY KEY( candidato , rasgo , fecha)
);

-- For perfiles(fk_Perfil_Candidatos)
ALTER TABLE perfiles ADD
	CONSTRAINT fk_Perfil_Candidatos
	FOREIGN KEY ( candidato )
	REFERENCES candidatos ( correo )
	ON DELETE CASCADE
    ON UPDATE CASCADE;