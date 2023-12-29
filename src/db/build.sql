DROP TABLE IF EXISTS registration;
DROP TABLE IF EXISTS machine;
DROP TABLE IF EXISTS shop;
DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS model;
DROP TABLE IF EXISTS category;

CREATE TABLE IF NOT EXISTS category(
	id SMALLSERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS model(
	id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
	category_id SMALLSERIAL,
	name VARCHAR(255) NOT NULL,
	-- create_date DATE NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_category
	FOREIGN KEY(category_id)
		REFERENCES category(id)
);

CREATE TABLE IF NOT EXISTS product(
	id SERIAL PRIMARY KEY,
	model_id UUID NOT NULL,
	serial_number INT,
	-- create_date DATE NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_model
	FOREIGN KEY(model_id)
		REFERENCES model(id)
);
CREATE  SEQUENCE product_serial_seq START 1;
CREATE OR REPLACE FUNCTION set_product_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW.id := (
        SELECT NEXTVAL('product_serial_seq') + (
            SELECT COALESCE(MAX(serial_number), 0)
            FROM product
            WHERE model_id = NEW.model_id
        ) + 1
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_product_id_trigger
BEFORE INSERT ON product
FOR EACH ROW
EXECUTE FUNCTION set_product_id();

CREATE TABLE IF NOT EXISTS member (
	id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
	name VARCHAR(100) NOT NULL
	-- join_date DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS shop (
	id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
	-- I'll skip the location to simplify the prototype
	-- location VARCHAR(100) NOT NULL,
	establish_date DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS machine (
	id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
	ip VARCHAR(35),
	shop_id UUID NOT NULL,
	-- start_date DATE NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_shop
	FOREIGN KEY(shop_id)
		REFERENCES shop(id)
);

CREATE TABLE IF NOT EXISTS registration(
	id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
	product_id SERIAL UNIQUE NOT NULL,
	member_id UUID NOT NULL,
	shop_id UUID NOT NULL,
	machine_id UUID NOT NULL,
	date DATE NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_product
		FOREIGN KEY(product_id)
			REFERENCES product(id),
	CONSTRAINT fk_member
		FOREIGN KEY(member_id)
			REFERENCES member(id),
	CONSTRAINT fk_shop
		FOREIGN KEY(shop_id)
			REFERENCES shop(id),
	CONSTRAINT fk_machine
		FOREIGN KEY(machine_id)
			REFERENCES machine(id)
);
