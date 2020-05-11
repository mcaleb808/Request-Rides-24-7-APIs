import pool from '../config/dbConfig';

const tables = `DROP TYPE IF EXISTS availability, trip_status, invoice_status CASCADE;
    CREATE TYPE availability AS ENUM ('available', 'busy', 'off');
    CREATE TYPE trip_status AS ENUM ('ongoing', 'pending', 'completed', 'canceled');
    CREATE TYPE invoice_status AS ENUM ('pending', 'paid', 'canceled');
    DROP TABLE IF EXISTS drivers, riders, trips, invoices CASCADE;
    CREATE TABLE drivers (
      id SERIAL PRIMARY KEY,
      fullname VARCHAR(60) NOT NULL,
      plate_no VARCHAR(20) NOT NULL UNIQUE,
      location VARCHAR(60) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      status availability DEFAULT 'available',
      created_on TIMESTAMP DEFAULT NOW()
    );
    CREATE TABLE riders (
      id SERIAL PRIMARY KEY,
      fullname VARCHAR(60) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      created_on TIMESTAMP DEFAULT NOW()     
    );
      CREATE TABLE trips (
      id SERIAL PRIMARY KEY,
      pickup_point VARCHAR(60) NOT NULL,
      destination VARCHAR(60) NOT NULL UNIQUE,
      status trip_status DEFAULT 'ongoing',
      created_on TIMESTAMP DEFAULT NOW(),
      rider_id INTEGER NOT NULL REFERENCES riders(id),
      driver_id INTEGER NOT NULL REFERENCES drivers(id) ON DELETE CASCADE 
    );
    CREATE TABLE invoices (
      id SERIAL PRIMARY KEY,
      status invoice_status DEFAULT 'pending',
      created_on TIMESTAMP DEFAULT NOW(),      
      trip_id INTEGER NOT NULL REFERENCES trips(id) ON DELETE CASCADE 
    );`;
const createTables = async () => {
  try {
    await pool.query(tables);
    process.stdout.write(', Creating tables...');
  } catch (err) {
    process.stdout.write(err);
  }
};
createTables();
