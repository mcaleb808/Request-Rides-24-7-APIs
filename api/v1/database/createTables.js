import pool from '../config/dbConfig';

const tables = `DROP TYPE IF EXISTS availability, trip_status, invoice_status CASCADE;
    CREATE TYPE availability AS ENUM ('available', 'busy', 'off');
    CREATE TYPE trip_status AS ENUM ('ongoing', 'pending', 'completed', 'canceled');
    CREATE TYPE invoice_status AS ENUM ('pending', 'paid', 'canceled');
    DROP TABLE IF EXISTS drivers, riders, trips, invoices CASCADE;
    CREATE TABLE drivers (
      id UUID NOT NULL PRIMARY KEY,
      fullname VARCHAR(60) NOT NULL,
      plateno VARCHAR(20) NOT NULL UNIQUE,
      location VARCHAR(60) NOT NULL,
      phone INTEGER NOT NULL UNIQUE,
      status VARCHAR(20) DEFAULT 'available',
      createdon TIMESTAMP DEFAULT NOW()
    );
    CREATE TABLE riders (
      id UUID NOT NULL PRIMARY KEY,
      fullname VARCHAR(60) NOT NULL,
      phone INTEGER NOT NULL UNIQUE,
      createdon TIMESTAMP DEFAULT NOW()     
    );
      CREATE TABLE trips (
      id UUID NOT NULL PRIMARY KEY,
      departure VARCHAR(60) NOT NULL,
      destination VARCHAR(60) NOT NULL UNIQUE,
      status VARCHAR(20) DEFAULT 'ongoing',
      createdon TIMESTAMP DEFAULT NOW(),
      rider_id UUID NOT NULL REFERENCES riders(id),
      driver_id UUID NOT NULL REFERENCES drivers(id) ON DELETE CASCADE 
    );
    CREATE TABLE invoices (
      id UUID NOT NULL PRIMARY KEY,
      status VARCHAR(20) DEFAULT 'pending',
      createdon TIMESTAMP DEFAULT NOW(),      
      trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE 
    );`;
const createTables = async () => {
  try {
    await pool.query(tables);
    process.stdout.write(', tables created');
  } catch (err) {
    process.stdout.write(err);
  }
};
createTables();
