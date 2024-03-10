import Error "mo:base/Error";
import List "mo:base/List";
import Bool "mo:base/Bool";
import Float "mo:base/Float";
import Debug "mo:base/Debug";

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
};
