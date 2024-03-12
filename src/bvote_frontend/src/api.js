const apiUrl = process.env.REACT_APP_API_URL;

// Fungsi untuk mencari NIK
export const searchByNIK = async (nik) => {
    try {
        const response = await fetch(`${apiUrl}/users/nik/${nik}`);
        const data = await response.json(); // Coba untuk mengambil data JSON

        // Jika tidak ada kesalahan saat mengambil data JSON
        if (response.ok) {
            return { success: true, data };
        } else {
            return { success: false, error: data.message || 'Data tidak ditemukan' }; // Menggunakan pesan dari server jika ada
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, error: 'Terjadi kesalahan saat memproses permintaan' };
    }
};

// Fungsi untuk mencari kandidat berdasarkan ID
export const searchByID = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/users/${id}`);
        const data = await response.json(); // Mengambil data JSON dari respons

        // Jika respons berhasil
        if (response.ok) {
            return { success: true, data: data.data }; // Mengembalikan data kandidat dari properti "data"
        } else {
            return { success: false, error: data.message || 'Data tidak ditemukan' }; // Menggunakan pesan dari server jika ada
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, error: 'Terjadi kesalahan saat memproses permintaan' };
    }
};

export const getDataUser = async (user_id) => {
    try {
      const response = await fetch(`${apiUrl}/users/${user_id}`);
      const data = await response.json();
  
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.message || 'Failed to get user data' };
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return { success: false, error: 'Failed to get user data' };
    }
  };

// api.js
export const getCandidates = async () => {
    try {
        const response = await fetch(`${apiUrl}/candidates/2024/president`);
        const data = await response.json();

        if (response.ok) {
            return { success: true, data: data.data };
        } else {
            return { success: false, error: data.message || 'Gagal mendapatkan data kandidat' };
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, error: 'Terjadi kesalahan saat memproses permintaan' };
    }
};

// Fungsi untuk melakukan post vote
export const postVote = async (candidate_id, user_id) => {
    try {
        const response = await fetch(`${apiUrl}/votes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `eyJhbGciOiJFZERTQSJ9.eyJpc3MiOiJ0bXMiLCJzdWIiOiJ3MTgyYjRyaXFrcjVpcXNzZjZwemozdXEiLCJhdWQiOiJ0bXMiLCJleHAiOjE3MTAxMTk0MjMsIm5iZiI6MTcwNzUyNzQyMywianRpIjoiYjQ4ZjVkODJhMTllNWM4ZiIsImRhdGEiOnsiZW1haWwiOiJpa3JvbUBnbWFpbC5jb20iLCJuYW1lIjoiaWtyb20iLCJyb2xlIjoiYWRtaW4ifX0.2p1FefZ0U7wWtIrj6QkG2Kc9kOfYZ5Vm-8gPXg33PMYejEB5MRK-_YX1UDmR9bKenqfLgQ0gYBcGPVPOL9q6CA` // Jangan lupa untuk menambahkan token autentikasi jika diperlukan oleh API
            },
            body: JSON.stringify({
                candidate_id,
                user_id,
                category: "Presiden",
                year_election: 2024
            })
        });
        const data = await response.json();

        if (response.ok) {
            return { success: true, data };
        } else {
            return { success: false, error: data.message || 'Failed to post vote' };
        }
    } catch (error) {
        console.error('Error posting vote:', error);
        return { success: false, error: 'Failed to post vote' };
    }
};

// Fungsi untuk mendapatkan status vote berdasarkan user_id
export const getUserVoteStatus = async (user_id) => {
    try {
        const response = await fetch(`${apiUrl}/votes?user_id=${user_id}`);
        const data = await response.json();

        if (response.ok) {
            // Jika terdapat data vote, user sudah melakukan vote
            const hasVoted = data.length > 0;
            return { success: true, hasVoted };
        } else {
            return { success: false, error: data.message || 'Failed to fetch vote status' };
        }
    } catch (error) {
        console.error('Error fetching vote status:', error);
        return { success: false, error: 'Failed to fetch vote status' };
    }
};


export const uploadKTP = async (photo) => {
    try {
      const formData = new FormData();
      formData.append('photo', photo); // Menggunakan key "photo" untuk mengunggah foto
  
      const response = await fetch(`${apiUrl}/users/read`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Gagal mengunggah file KTP');
      }
  
      const responseData = await response.json();
      return responseData.data?.nik || null;
    } catch (error) {
      throw new Error(error.message || 'Terjadi kesalahan saat mengunggah file KTP');
    }
  };  