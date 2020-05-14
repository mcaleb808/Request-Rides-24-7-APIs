import pool from '../api/v1/config/dbConfig';

const seeds = `INSERT INTO drivers
        (fullname, plate_no, location, phone)
    VALUES
        ('Mugisha Caleb', 'RAD aaa A', 'MTN Rwandacell Limited, Kigali', '017868488284'),
        ('Manzi Kevin', 'RAE aaa C', 'UNHCR Representative Office, Kigali', '017024848284'),
        ('Umuhoza Joy', 'RAC xxx F', 'Green Hills Academy, Kigali', '017025844'),
        ('Ishimwe Olivier', 'RAC abc Z', 'Amahoro National Stadium, Kigali', '01705844430'),
        ('Keza Ange', 'RAZ xxx D', 'Bank of Kigali, Giporoso Branch, Kigali', '017025844'),
        ('Max Alex', 'RAD ada v', 'Kigali International Airport, Kigali', '017823458284'),
        ('Peter Wolf', 'RaD xxa C', 'Directorate-General of Immigration and Emigration, Kigali', '01703448284'),
        ('Jane Smith', 'RAA xxx S', 'University of Tourism, Technology and Business Studies (UTB), Kigali', '017105844'),
        ('Jack Ma', 'RAB wer X', 'UZI Collections, Kigali', '015844430'),
        ('Gentil Irakoze', 'RAD xxx S', 'Kigali Marriott Hotel', '01702567844'),
        ('Murenzi Bruce', 'RAC nnn D', 'Bank of Kigali, Giporoso Branch, Kigali', '012985844');

    INSERT INTO riders
        (fullname, phone)
    VALUES
        ('John Peter', '0458488284'), ('Kami Vito', '0785848384'),
        ('Hans Xavier', '084838584838'), ('Claudia Van', '7989693933'),
        ('Uwase Pamela', '07959493534'), ('Yves Shema', '784848882' );

    INSERT INTO trips
        (pickup_point, destination, rider_id, driver_id)
    VALUES
        ('Kimironko, Kigali', 'Kanombe, Kigali', 3, 1),
        ('Nyarutarama, Kigali', 'downtown kigali rwanda', 1, 4),
        ('Nyamirambo', 'CHIC Building, KN 2 Ave, Kigali', 2, 3 );
`;
const createSeeds = async () => {
  try {
    await pool.query(seeds);
    process.stdout.write(', Creating seeds...');
  } catch (err) {
    process.stdout.write(err);
  }
};
createSeeds();
