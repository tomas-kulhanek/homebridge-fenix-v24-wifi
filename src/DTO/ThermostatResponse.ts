export default interface ThermostatResponse {
    id: string;
    id_device: string;
    nom_appareil: string;
    num_zone: string;
    id_appareil: string;
    programme: string;
    consigne_confort: string;
    consigne_hg: string;
    consigne_eco: string;
    consigne_boost: string;
    consigne_manuel: string;
    min_set_point: string;
    max_set_point: string;
    date_start_boost: null;
    time_boost: string;
    nv_mode: string;
    temperature_air: string;
    temperature_sol: string;
    on_off: string;
    pourcent_light: string;
    status_com: string;
    recep_status_global: string;
    gv_mode: string;
    puissance_app: string;
    smarthome_id: string;
    bundle_id: string;
    date_update: string;
    label_interface: string;
    heating_up: string;
    error_code: string;
    heat_cool: string;
    fan_speed: string;
    bit_override: string;
    fan_error: null;
    time_boost_format_chrono: { d: string; h: string; m: string; s: string };
}

