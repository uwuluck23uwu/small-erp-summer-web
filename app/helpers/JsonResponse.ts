export const KeyJson = "Vm14U1ExWXhVblJXYkZwT1ZsWmFWVlpyVmtaUFVUMDk=";

export async function DecryptJson(encryptedData: any, encryptionKey: string) {
  try {
    // Ensure the encryption key is 256 bits long
    while (encryptionKey.length < 32) {
      encryptionKey += encryptionKey; // Double the key until it's at least 256 bits
    }
    encryptionKey = encryptionKey.slice(0, 32); // Truncate to 256 bits if longer

    // Convert the Base64-encoded encrypted data to binary
    const cipherText = Uint8Array.from(atob(encryptedData), (c) =>
      c.charCodeAt(0)
    );

    // Import the encryption key
    const importedKey = await window.crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(encryptionKey),
      { name: "AES-CBC" },
      false,
      ["decrypt"]
    );

    // Create an empty IV (Initialization Vector)
    const iv = new Uint8Array(16); // IV should be randomly generated, but for simplicity, using all zeros here

    // Decrypt the data
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: "AES-CBC",
        iv: iv,
      },
      importedKey,
      cipherText
    );

    // Convert the decrypted binary data to a string
    return JSON.parse(new TextDecoder().decode(decryptedData));
  } catch (error) {
    return encryptedData;
  }
}
