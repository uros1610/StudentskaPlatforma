
-- DROP DATABASE studentskaplatforma

-- CREATE DATABASE studentskaplatforma

-- use studentskaplatforma

CREATE TABLE fakultet (
    ime_fakulteta VARCHAR(80) PRIMARY KEY
);

CREATE TABLE smjer (
    ime_smjera VARCHAR(40),
    ime_fakulteta VARCHAR(80),
    CONSTRAINT pk_smjer PRIMARY KEY (ime_smjera, ime_fakulteta),
    CONSTRAINT fk_fakultetsmjer FOREIGN KEY (ime_fakulteta) REFERENCES fakultet(ime_fakulteta)
);

CREATE TABLE tip_provjere (
    ime_provjere VARCHAR(20) PRIMARY KEY
);

CREATE TABLE semestar (
    broj_semestra INTEGER AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE predmet (
    ime_predmeta VARCHAR(40),
    ime_smjera VARCHAR(40),
    ime_fakulteta VARCHAR(80),
    broj_kredita INTEGER,
    fond_casova INTEGER,
    broj_semestra INTEGER,
    CONSTRAINT pk_predmet PRIMARY KEY (ime_predmeta, ime_smjera, ime_fakulteta),
    CONSTRAINT fk_predmetsmjer FOREIGN KEY (ime_smjera, ime_fakulteta) REFERENCES smjer(ime_smjera, ime_fakulteta),
    CONSTRAINT fk_predmetsemestar FOREIGN KEY (broj_semestra) REFERENCES semestar(broj_semestra)
);

CREATE TABLE profesor (
    ime_profesora VARCHAR(20),
    prezime_profesora VARCHAR(20),
    datum_rodjenja_profesora DATE,
    korisnickoime VARCHAR(40) PRIMARY KEY,
    lozinka TEXT
);

CREATE TABLE obavjestenje (
    id_obavjestenja INTEGER AUTO_INCREMENT PRIMARY KEY,
    datum_kreiranja DATETIME,
    opis TEXT,
    naslov TEXT,
    korisnickoime_profesora VARCHAR(40),
    ime_predmeta VARCHAR(40),
    ime_smjera VARCHAR(40),
    ime_fakulteta VARCHAR(80),
    CONSTRAINT fk_obavjestenjepredmet FOREIGN KEY (ime_predmeta, ime_smjera, ime_fakulteta) REFERENCES predmet (ime_predmeta, ime_smjera, ime_fakulteta),
    CONSTRAINT fk_obavjestenjeprofesor FOREIGN KEY (korisnickoIme_profesora) REFERENCES profesor (korisnickoIme)
);

CREATE TABLE student (
    ime_studenta VARCHAR(20),
    prezime_studenta VARCHAR(20),
    jmbg_studenta CHAR(13),
    datum_rodjenja_studenta DATE,
    indeks_studenta VARCHAR(10),
    korisnickoime VARCHAR(40) PRIMARY KEY,
    lozinka TEXT,
    ime_fakulteta VARCHAR(80),
    ime_smjera VARCHAR(40),
    UNIQUE (indeks_studenta,ime_fakulteta,ime_smjera),
    CONSTRAINT fk_student FOREIGN KEY (ime_fakulteta, ime_smjera) REFERENCES smjer (ime_fakulteta, ime_smjera)
);

CREATE TABLE pohadja (
    korisnickoime_studenta VARCHAR(40),
    ime_predmeta VARCHAR(40),
    ime_smjera VARCHAR(40),
    ime_fakulteta VARCHAR(80),
    ukupan_broj_poena INTEGER,
    CONSTRAINT pk_rezultat PRIMARY KEY (ime_predmeta, ime_smjera, ime_fakulteta, korisnickoime_studenta),
    CONSTRAINT fk_rezultatpredmet FOREIGN KEY (ime_predmeta, ime_smjera, ime_fakulteta) REFERENCES predmet (ime_predmeta, ime_smjera, ime_fakulteta),
    CONSTRAINT fk_rezultatstudent FOREIGN KEY (korisnickoime_studenta) REFERENCES student (korisnickoime)
);


CREATE TABLE rezultat (
    id_provjere INTEGER AUTO_INCREMENT PRIMARY KEY,
    broj_poena INTEGER,
    ime_provjere VARCHAR(20),
    korisnickoime_studenta VARCHAR(40),
    ime_predmeta VARCHAR(40),
    ime_smjera VARCHAR(40),
    ime_fakulteta VARCHAR(80),
    datum_odrzavanja DATETIME,
    CONSTRAINT fk_tip FOREIGN KEY (ime_provjere) REFERENCES tip_provjere (ime_provjere),
    CONSTRAINT fk_rezultatprovjera FOREIGN KEY (korisnickoime_studenta, ime_predmeta, ime_smjera, ime_fakulteta) REFERENCES pohadja (korisnickoime_studenta, ime_predmeta, ime_smjera, ime_fakulteta)
);

CREATE TABLE profesor_predmet (
    korisnickoime_profesora VARCHAR(40),
    ime_predmeta VARCHAR(40),
    ime_smjera VARCHAR(40),
    ime_fakulteta VARCHAR(80),
    CONSTRAINT pk_profesor_predmet PRIMARY KEY (korisnickoIme_profesora, ime_predmeta, ime_smjera, ime_fakulteta),
    CONSTRAINT fk_predmet FOREIGN KEY (ime_predmeta, ime_smjera, ime_fakulteta) REFERENCES predmet (ime_predmeta, ime_smjera, ime_fakulteta),
    CONSTRAINT fk_profesor FOREIGN KEY (korisnickoime_profesora) REFERENCES profesor (korisnickoime)
);

CREATE TABLE materijal (
    id_materijala INTEGER AUTO_INCREMENT PRIMARY KEY,
    korisnickoime_profesora VARCHAR(40),
    ime_predmeta VARCHAR(40),
    ime_smjera VARCHAR(40),
    ime_fakulteta VARCHAR(80),
    putanja TEXT,
    naslov VARCHAR(50),
    CONSTRAINT fk_materijal_profesor_predmet FOREIGN KEY (korisnickoime_profesora, ime_predmeta, ime_smjera, ime_fakulteta) REFERENCES profesor_predmet (korisnickoime_profesora, ime_predmeta, ime_smjera, ime_fakulteta)
);

CREATE TABLE Neprocitano_Obavjestenje(

korisnickoime_studenta VARCHAR(40),
id_obavjestenja INTEGER,

CONSTRAINT pk_neprocitana PRIMARY KEY(korisnickoime_studenta,id_obavjestenja),
CONSTRAINT fk_neprocitanastudent FOREIGN KEY(korisnickoime_studenta) REFERENCES Student(korisnickoime),
CONSTRAINT fk_neprocitanaID FOREIGN KEY(id_obavjestenja) REFERENCES Obavjestenje(id_obavjestenja)

);

CREATE TABLE Svi_Ispiti(

korisnickoime_studenta VARCHAR(40),
ime_predmeta VARCHAR(40),
ime_smjera VARCHAR(40),
ime_fakulteta VARCHAR(80),
brojPoena INTEGER,

CONSTRAINT pk_sviispiti PRIMARY KEY(korisnickoime_studenta,ime_predmeta,ime_smjera,ime_fakulteta),
CONSTRAINT fk_sviispitiStudent FOREIGN KEY(korisnickoime_studenta) REFERENCES Student(korisnickoime),
CONSTRAINT fk_sviispitiPredmet FOREIGN KEY(ime_predmeta,ime_smjera,ime_fakulteta) REFERENCES Predmet(ime_predmeta,ime_smjera,ime_fakulteta)

)

/*
DELIMITER //

CREATE TRIGGER trg_insert_obavjestenje
AFTER INSERT ON Obavjestenje
FOR EACH ROW
BEGIN
    DECLARE student_korisnickoime VARCHAR(40);
    
    DECLARE cur_students CURSOR FOR
        SELECT korisnickoime_studenta
        FROM pohadja
        WHERE ime_predmeta = NEW.ime_predmeta
          AND ime_smjera = NEW.ime_smjera
          AND ime_fakulteta = NEW.ime_fakulteta;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND
        SET @done = 1;
    
    OPEN cur_students;
    
    fetch_students: LOOP
        FETCH cur_students INTO student_korisnickoime;
        IF @done THEN
            LEAVE fetch_students;
        END IF;
                INSERT INTO Neprocitano_Obavjestenje (korisnickoime_studenta, id_obavjestenja)
        VALUES (student_korisnickoime, NEW.id_obavjestenja);
    END LOOP;
    
    -- Close cursor
    CLOSE cur_students;
END //

DELIMITER ;
*/

/*
DELIMITER //

CREATE TRIGGER trg_update_obavjestenje
AFTER UPDATE ON Obavjestenje
FOR EACH ROW
BEGIN
    DECLARE student_korisnickoime VARCHAR(40);
    DECLARE done INT DEFAULT 0;

    DECLARE cur_students CURSOR FOR
        SELECT korisnickoime_studenta
        FROM pohadja
        WHERE ime_predmeta = NEW.ime_predmeta
          AND ime_smjera = NEW.ime_smjera
          AND ime_fakulteta = NEW.ime_fakulteta;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND
        SET done = 1;
    
    OPEN cur_students;

    fetch_students: LOOP
        FETCH cur_students INTO student_korisnickoime;
        IF done THEN
            LEAVE fetch_students;
        END IF;
        INSERT IGNORE INTO Neprocitano_Obavjestenje (korisnickoime_studenta, id_obavjestenja)
        VALUES (student_korisnickoime, NEW.id_obavjestenja);
    END LOOP;

    -- Close cursor
    CLOSE cur_students;
END //

DELIMITER ;

*/
