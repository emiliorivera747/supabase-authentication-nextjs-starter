export function getSupabaseErrorMessage(errorCode: unknown): string {
  switch (errorCode) {
    case "anonymous_provider_disabled":
      return "Anonymous sign-ins are not allowed.";
    case "bad_code_verifier":
      return "The provided code is incorrect.";
    case "bad_json":
      return "The request contains invalid data.";
    case "bad_jwt":
      return "Invalid authorization token.";
    case "bad_oauth_callback":
      return "OAuth callback is missing required information.";
    case "bad_oauth_state":
      return "OAuth state is incorrect.";
    case "captcha_failed":
      return "Captcha verification failed.";
    case "conflict":
      return "There is a conflict with the database.";
    case "email_address_not_authorized":
      return "Email sending is not allowed for this address.";
    case "email_conflict_identity_not_deletable":
      return "Cannot unlink this identity because it is already used by another account.";
    case "email_exists":
      return "Email already exists.";
    case "email_not_confirmed":
      return "New confirmation link sent. Please confirm your email.";
    case "email_provider_disabled":
      return "Email signups are disabled.";
    case "flow_state_expired":
      return "Sign-in session expired. Please try again.";
    case "flow_state_not_found":
      return "Sign-in session not found. Please try again.";
    case "hook_payload_over_size_limit":
      return "Request payload is too large.";
    case "hook_timeout":
      return "Request timed out.";
    case "hook_timeout_after_retry":
      return "Request timed out after multiple attempts.";
    case "identity_already_exists":
      return "This identity is already linked to a user.";
    case "identity_not_found":
      return "Identity not found.";
    case "insufficient_aal":
      return "Higher security level required.";
    case "invite_not_found":
      return "Invite is expired or already used.";
    case "invalid_credentials":
      return "Invalid email or password.";
    case "manual_linking_disabled":
      return "Manual linking of accounts is disabled.";
    case "mfa_challenge_expired":
      return "MFA challenge expired. Please request a new one.";
    case "mfa_factor_name_conflict":
      return "MFA factors should not have the same name.";
    case "mfa_factor_not_found":
      return "MFA factor not found.";
    case "mfa_ip_address_mismatch":
      return "MFA process must be completed from the same IP address.";
    case "mfa_verification_failed":
      return "MFA verification failed. Incorrect code.";
    case "mfa_verification_rejected":
      return "MFA verification rejected.";
    case "mfa_verified_factor_exists":
      return "Verified MFA factor already exists.";
    case "mfa_totp_enroll_disabled":
      return "MFA TOTP enrollment is disabled.";
    case "mfa_totp_verify_disabled":
      return "MFA TOTP verification is disabled.";
    case "mfa_phone_enroll_disabled":
      return "MFA phone enrollment is disabled.";
    case "mfa_phone_verify_disabled":
      return "MFA phone verification is disabled.";
    case "no_authorization":
      return "Authorization required.";
    case "not_admin":
      return "User is not an admin.";
    case "oauth_provider_not_supported":
      return "OAuth provider is not supported.";
    case "otp_disabled":
      return "OTP sign-in is disabled.";
    case "otp_expired":
      return "OTP expired. Please try again.";
    case "over_email_send_rate_limit":
      return "Too many emails sent. Please wait and try again.";
    case "over_request_rate_limit":
      return "Too many requests. Please wait and try again.";
    case "over_sms_send_rate_limit":
      return "Too many SMS messages sent. Please wait and try again.";
    case "phone_exists":
      return "Phone number already exists.";
    case "phone_not_confirmed":
      return "Phone number not confirmed.";
    case "phone_provider_disabled":
      return "Phone signups are disabled.";
    case "provider_disabled":
      return "OAuth provider is disabled.";
    case "provider_email_needs_verification":
      return "Email verification required.";
    case "reauthentication_needed":
      return "Please reauthenticate to change your password.";
    case "reauthentication_not_valid":
      return "Reauthentication failed. Incorrect code.";
    case "request_timeout":
      return "Request timed out. Please try again.";
    case "same_password":
      return "New password must be different from the current password.";
    case "saml_assertion_no_email":
      return "No email address found in SAML assertion.";
    case "saml_assertion_no_user_id":
      return "No user ID found in SAML assertion.";
    case "saml_entity_id_mismatch":
      return "SAML entity ID mismatch.";
    case "saml_idp_already_exists":
      return "SAML identity provider already exists.";
    case "saml_idp_not_found":
      return "SAML identity provider not found.";
    case "saml_metadata_fetch_failed":
      return "Failed to fetch SAML metadata.";
    case "saml_provider_disabled":
      return "SAML provider is disabled.";
    case "saml_relay_state_expired":
      return "SAML relay state expired.";
    case "saml_relay_state_not_found":
      return "SAML relay state not found.";
    case "session_not_found":
      return "Session not found.";
    case "signup_disabled":
      return "Signups are disabled.";
    case "single_identity_not_deletable":
      return "Cannot delete the only identity.";
    case "sms_send_failed":
      return "Failed to send SMS.";
    case "sso_domain_already_exists":
      return "SSO domain already exists.";
    case "sso_provider_not_found":
      return "SSO provider not found.";
    case "too_many_enrolled_mfa_factors":
      return "Too many enrolled MFA factors.";
    case "unexpected_audience":
      return "Unexpected audience in request.";
    case "unexpected_failure":
      return "Unexpected error occurred.";
    case "user_already_exists":
      return "User already exists.";
    case "user_banned":
      return "User is banned.";
    case "user_not_found":
      return "User not found.";
    case "user_sso_managed":
      return "Cannot update fields for SSO user.";
    case "validation_failed":
      return "Invalid input.";
    case "weak_password":
      return "Password is too weak.";
    default:
      return "Something went wrong. Please try again.";
  }
}
