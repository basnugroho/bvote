import Error "mo:base/Error";
import List "mo:base/List";
import Bool "mo:base/Bool";
import Float "mo:base/Float";
import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Hash "mo:base/Hash";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Blob "mo:base/Blob";
import Nat32 "mo:base/Nat32";

actor bvote {

    type Voter = {
      id: Nat; 
      name: Text;
      vote: Nat
    };

    // var voters : List.List<Voter> = List.nil<Voter>;
    var voters : List.List<Voter> = List.tabulate<Voter>(5, func(i : Nat) : Voter {
    switch (i) {
        case 0 { return {id=1; name="Agus Salim"; vote=0}; };
        case 1 { return {id=2; name="Siti Aminah"; vote=0}; };
        case 2 { return {id=3; name="Budi Raharjo"; vote=0}; };
        case 3 { return {id=4; name="Dewi Sartika"; vote=0}; };
        case _ { return {id=5; name="Eko Prasetyo"; vote=0}; };
      };
    });

    public func add_voter(id: Nat, name: Text, vote: Nat): async Voter {
      let new_voter: Voter = {
        id = id;
        name = name;
        vote = 0;
      };
      voters := List.push(new_voter, voters);
      return new_voter;
    };

    public func get_voters() : async List.List<Voter> {
        return voters;
    };

    // Fungsi untuk mendapatkan informasi voter berdasarkan ID
    public func get_voter_by_id(voter_id: Nat) : async ?Voter {
        return List.find<Voter>(voters, func (v: Voter) : Bool { v.id == voter_id });
    };

    // // Fungsi untuk mendapatkan current time
    // private func get_current_time(): async Time.Time {
    //     return Time.now();
    // };

    // Candidate
    public type Candidate = {
        id: Nat;
        name: Text;
        category: Text;
    };

    // Inisialisasi contoh candidates
    var candidates: List.List<Candidate> = List.tabulate<Candidate>(3, func(i : Nat) : Candidate {
    switch (i) {
        case 0 { return {id=1; name="Kucing"; category="Pet"}; };
        case 1 { return {id=2; name="Hamster"; category="Pet"}; };
        case _ { return {id=3; name="Rakun"; category="Pet"}; };
      };
    });

    public func get_candidates() : async List.List<Candidate> {
        return candidates;
    };

    public func get_candidate_by_category(category: Text) : async List.List<Candidate> {
        return List.filter<Candidate>(candidates, func (v: Candidate) : Bool { v.category == category });
    };

    // Vote
    public type Vote = {
      nik_hashed: Text;
      candidate_id: Nat;
      category: Text;
      time: Time.Time;
    };

    // Fungsi hash sederhana
    public func hashNIK(nik: Nat): async Hash.Hash {
        return Hash.hash(nik);
    };
    
    var votes: List.List<Vote> = List.nil<Vote>();

    // Fungsi untuk mendapatkan waktu saat ini (asumsi sudah didefinisikan)
    public func get_current_time(): async Time.Time {
        // Implementasi sesuai kebutuhan
        return Time.now();
    };
};
