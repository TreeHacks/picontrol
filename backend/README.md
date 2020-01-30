PiControl Backend

## Database Schemas

### pis

CREATE TABLE pis (
  address VARCHAR(50) PRIMARY KEY, /* Pi's MAC address: assume no funny business for now. VARCHAR(50) to be safe but could be changed to int or something */
  id SERIAL,
  slug VARCHAR(255), /* user-friendly name */
  endpoint TEXT /* api to send requests to */
);

Note: more might be added here -- especially different "modes" for the pi (one scan per user, etc.)

### events

CREATE TABLE events {
    pi_address VARCHAR(50),
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50), /* id of the scanned user card/band */
    success BOOLEAN,
    endpoint TEXT,
    response TEXT /* we'll store the response for easy debugging */
}