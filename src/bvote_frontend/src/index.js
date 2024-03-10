import { bvote_backend } from "../../declarations/bvote_backend";

// Fungsi untuk menambahkan voter baru
document.getElementById("addVoterForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = parseInt(document.getElementById("voterId").value, 10);
    const name = document.getElementById("voterName").value;
    const vote = parseInt(document.getElementById("voterVote").value, 10);
    
    // Gunakan bvote_backend.add_voter di sini
    try {
        await bvote_backend.add_voter(id, name, vote);
        console.log("Voter added successfully");
        // Refresh list atau tampilkan notifikasi ke pengguna
    } catch (error) {
        console.error("Failed to add voter:", error);
    }
});

// Fungsi untuk mendapatkan informasi voter berdasarkan ID
document.getElementById("getVoterForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = parseInt(document.getElementById("searchVoterId").value, 10);
    
    try {
        const voter = await bvote_backend.get_voter_by_id(id);
        console.log("Voter found:", voter);
        // Tampilkan informasi voter di UI
    } catch (error) {
        console.error("Failed to get voter:", error);
    }
});

// Fungsi untuk menampilkan semua voter
document.getElementById("getAllVoters").addEventListener("click", async () => {
    try {
        const voters = await bvote_backend.get_voters();
        console.log("All voters:", voters);
        // Tampilkan daftar semua voter di UI
    } catch (error) {
        console.error("Failed to get all voters:", error);
    }
});
