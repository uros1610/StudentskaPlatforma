
 -- use studentskaplatforma

INSERT INTO fakultet (ime_fakulteta) VALUES
('Fakultet za elektrotehniku'),
('Fakultet za informatiku'),
('Fakultet za mašinstvo'),
('Ekonomski fakultet');

INSERT INTO smjer (ime_smjera, ime_fakulteta) VALUES
('Elektronika', 'Fakultet za elektrotehniku'),
('Računarstvo', 'Fakultet za informatiku'),
('Softversko inženjerstvo', 'Fakultet za informatiku'),
('Menadžment', 'Ekonomski fakultet');

INSERT INTO tip_provjere (ime_provjere) VALUES
('Kolokvijum'),
('Ispit'),
('Projekat'),
('Zadaća');

INSERT INTO semestar (broj_semestra) VALUES
(1), (2), (3), (4);

INSERT INTO predmet (ime_predmeta, ime_smjera, ime_fakulteta, broj_kredita, fond_casova, broj_semestra) VALUES
('Matematika 1', 'Elektronika', 'Fakultet za elektrotehniku', 6, 60, 1),
('Matematika 2', 'Računarstvo', 'Fakultet za informatiku', 6, 60, 2),
('Programiranje', 'Softversko inženjerstvo', 'Fakultet za informatiku', 6, 45, 1),
('Ekonomija', 'Menadžment', 'Ekonomski fakultet', 5, 30, 1),
('Elektricna kola', 'Elektronika', 'Fakultet za elektrotehniku', 6, 60, 1),
('Matematika 2', 'Elektronika', 'Fakultet za elektrotehniku', 6, 60, 1),
('Matematika 3', 'Elektronika', 'Fakultet za elektrotehniku', 6, 60, 1);



INSERT INTO profesor (ime_profesora, prezime_profesora, datum_rodjenja_profesora, korisnickoime, lozinka) VALUES
('Ivan', 'Ivić', '1980-05-12', 'iivic', '$2b$10$tpe6vPSb4zhxVaSkR92.6uT9CtnaGBgVK159yZYw8Bffr4EIF2AHK'),
('Ana', 'Anić', '1985-11-23', 'aanic', 'password2'),
('Marko', 'Markić', '1975-02-15', 'mmarkic', '$2b$10$X.beHVuYfGFNE9B41//e8.bQs3yI1W/KpVqZXJTng2W.VvR8jV4Ni'),
('Petra', 'Petrović', '1990-08-30', 'ppetrovic', 'password4');

INSERT INTO obavjestenje (datum_kreiranja, opis, naslov, korisnickoime_profesora, ime_predmeta, ime_smjera, ime_fakulteta) VALUES
(NOW(), 'Predavanje iz Matematike 1', 'Predavanje', 'iivic', 'Matematika 1', 'Elektronika', 'Fakultet za elektrotehniku'),
(NOW(), 'Ispit iz Programiranja', 'Ispit', 'aanic', 'Programiranje', 'Softversko inženjerstvo', 'Fakultet za informatiku'),
(NOW(), 'Projekat iz Ekonomije', 'Projekat', 'mmarkic', 'Ekonomija', 'Menadžment', 'Ekonomski fakultet'),
(NOW(), 'Kolokvijum iz Matematike 2', 'Kolokvijum', 'ppetrovic', 'Matematika 2', 'Računarstvo', 'Fakultet za informatiku');

INSERT INTO student (ime_studenta, prezime_studenta, jmbg_studenta, datum_rodjenja_studenta, indeks_studenta, korisnickoime, lozinka, ime_fakulteta, ime_smjera) VALUES
('test','test','0202999123459','1999-02-02','EE124','manic','$2b$10$tvodK/KzQ1HPTw2U1/eFXe4hD2ovI.v3N9myvoFRyY2KRf.MaAIjm','Ekonomski fakultet','Menadžment'),
('Luka', 'Lukić', '0202999123456', '1999-02-02', 'EL123', 'llukic', 'student1', 'Fakultet za elektrotehniku', 'Elektronika'),
('Marko', 'Milić', '0101998123457', '1998-01-01', 'EL456', 'mmilic', '$2b$10$jaYKrK2rh9okwo5ygnFUGe9LWJJmfP.7qOFWYYKCU60eoO9X8psXa', 'Fakultet za elektrotehniku', 'Elektronika'),
('Miloš', 'Marković', '0303997123458', '1997-03-03', 'EL789', 'mmarkovic', '$2b$10$jaYKrK2rh9okwo5ygnFUGe9LWJJmfP.7qOFWYYKCU60eoO9X8psXa', 'Fakultet za elektrotehniku', 'Elektronika');


INSERT INTO pohadja (korisnickoime_studenta, ime_predmeta, ime_smjera, ime_fakulteta) VALUES
('llukic', 'Matematika 1', 'Elektronika', 'Fakultet za elektrotehniku'),
('llukic', 'Programiranje', 'Softversko inženjerstvo', 'Fakultet za informatiku'),
('mmilic', 'Matematika 1', 'Elektronika', 'Fakultet za elektrotehniku'),
('mmilic', 'Matematika 2', 'Računarstvo', 'Fakultet za informatiku'),
('mmarkovic', 'Matematika 1', 'Elektronika', 'Fakultet za elektrotehniku'),
('mmarkovic', 'Matematika 2', 'Računarstvo', 'Fakultet za informatiku'),
('manic', 'Ekonomija', 'Menadžment', 'Ekonomski fakultet'),
('manic', 'Programiranje', 'Softversko inženjerstvo', 'Fakultet za informatiku');

INSERT INTO rezultat (broj_poena, ime_provjere, korisnickoime_studenta, ime_predmeta, ime_smjera, ime_fakulteta, datum_odrzavanja) VALUES
(75, 'Kolokvijum', 'llukic', 'Matematika 1', 'Elektronika', 'Fakultet za elektrotehniku', NOW()),
(80, 'Ispit', 'mmilic', 'Matematika 1', 'Elektronika', 'Fakultet za elektrotehniku', NOW()),
(85, 'Projekat', 'mmarkovic', 'Matematika 1', 'Elektronika', 'Fakultet za elektrotehniku', NOW()),
(70, 'Zadaća', 'manic', 'Ekonomija', 'Menadžment', 'Ekonomski fakultet', NOW());


INSERT INTO profesor_predmet (korisnickoime_profesora, ime_predmeta, ime_smjera, ime_fakulteta) VALUES
('iivic', 'Matematika 1', 'Elektronika', 'Fakultet za elektrotehniku'),
('aanic', 'Programiranje', 'Softversko inženjerstvo', 'Fakultet za informatiku'),
('mmarkic', 'Ekonomija', 'Menadžment', 'Ekonomski fakultet'),
('ppetrovic', 'Matematika 2', 'Računarstvo', 'Fakultet za informatiku');

INSERT INTO materijal (korisnickoime_profesora, ime_predmeta, ime_smjera, ime_fakulteta, putanja, naslov) VALUES
('iivic', 'Matematika 1', 'Elektronika', 'Fakultet za elektrotehniku', '/putanja/do/materijala1', 'Materijal 1'),
('aanic', 'Programiranje', 'Softversko inženjerstvo', 'Fakultet za informatiku', '/putanja/do/materijala2', 'Materijal 2'),
('mmarkic', 'Ekonomija', 'Menadžment', 'Ekonomski fakultet', '/putanja/do/materijala3', 'Materijal 3'),
('ppetrovic', 'Matematika 2', 'Računarstvo', 'Fakultet za informatiku', '/putanja/do/materijala4', 'Materijal 4');

INSERT INTO Svi_Ispiti(korisnickoime_studenta,ime_predmeta,ime_smjera,ime_fakulteta,brojPoena) VALUES(
'mmilic','Matematika 1','Elektronika','Fakultet za elektrotehniku',90),
('mmarkovic','Matematika 1','Elektronika','Fakultet za elektrotehniku',75),
('llukic','Matematika 1','Elektronika','Fakultet za elektrotehniku',35),
('manic','Ekonomija','Menadžment','Ekonomski fakultet',15)