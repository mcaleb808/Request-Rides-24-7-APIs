import pool from '../config/dbConfig';

const seeds = `INSERT INTO drivers
        (fullname, plate_no, location, phone)
    VALUES
        ('Mugisha Caleb', 'RAD aaa A', 'Remera, Kigali', '017868488284'),
        ('Manzi Kevin', 'RAE aaa C', 'Kagarama, Kigali', '017024848284'),
        ('Umuhoza Joy', 'RAC xxx F', 'Nyamirambo, Kigali', '017025844'),
        ('Ishimwe Olivier', 'RAC abc Z', 'Nyarugenge, Kigali', '01705844430'),
        ('Keza Ange', 'RAZ xxx D', 'Kimihurura, Kigali', '017025844');

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
