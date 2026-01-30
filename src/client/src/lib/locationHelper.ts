export const getActualLocation = async (): Promise<string> => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return new Promise<string>((resolve, reject) => {
    if (!navigator.geolocation) {
      resolve(`TZ: ${tz} | GPS: Not Supported`);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = `GPS: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
        resolve(`TZ: ${tz} | ${coords}`);
      },
      (err) => {
        if (err.code === 1) {
          reject(new Error("LOCATION_DENIED"));
        } else {
          resolve(`TZ: ${tz} | GPS: Unavailable (${err.code})`);
        }
      },
      { timeout: 8000, enableHighAccuracy: true },
    );
  });
};
