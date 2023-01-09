CREATE OR REPLACE FUNCTION CHECK_AVAILABILITY() RETURNS 
TRIGGER LANGUAGE PLPGSQL AS $$ 
	BEGIN IF EXISTS (
	        SELECT patient_id
	        FROM appointements
	        WHERE
	            doctor_id = NEW.doctor_id
	            AND patient_id = NEW.patient_id
	            AND appointement_date <= NEW.appointement_date + interval '1 minutes' * NEW.appointement_duration_minutes
	            AND NEW.appointement_date <= appointement_date + interval '1 minutes' * appointement_duration_minutes
	    ) THEN RAISE NOTICE 'NOPE';
	RETURN null;
	END IF;
	RETURN NEW;
	END;
$$; 

CREATE OR REPLACE TRIGGER CHECK_AVAILABILITY_TIME 
	BEFORE
	INSERT
	    ON appointements FOR EACH ROW
	EXECUTE
	    PROCEDURE check_availability();
; 

INSERT INTO
    appointements (
        appointement_date,
        appointement_duration_minutes,
        appointement_reason,
        created_at,
        updated_at,
        doctor_id,
        patient_id
    )
VALUES (
        now(),
        20,
        'teests',
        now(),
        now(),
        2,
        1
    );