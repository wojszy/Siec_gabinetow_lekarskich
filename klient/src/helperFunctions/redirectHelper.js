export function handleRedirect (role)  {
    var path = "/";
    if (role === "Patient") path = "/patient";
    else if (role === "Receptionist") path = "/receptionist";
    else if (role === "Doctor") path = "/doctor";
    else if (role === "Manager") path = "/manager";
    else path = "/login";
    return path;
  }