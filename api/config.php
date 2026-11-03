<?php
// Enquiry delivery settings. Leave notify_email empty until IMS confirms
// the address that should receive enquiries.
return [
    'notify_email' => 'info@ims.rw', // enquiries are always stored; this also emails them if the server can send mail
    'from_email'   => '',          // e.g. 'website@example.com' (must be allowed by your mail setup)
    'rate_limit_per_hour' => 12,   // per IP address
];
