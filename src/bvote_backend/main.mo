import Error "mo:base/Error";
import List "mo:base/List";

actor bvote {
    type Voter = {id: Nat; name: Text; phone: Text; vote: Text};

    var voters : List.List<Voter> = List.tabulate<Voter>(5, func(i : Nat) : Voter {
    switch (i) {
        case 0 { return {id=1; name="Agus Salim"; phone="1234567890"; vote=""}; };
        case 1 { return {id=2; name="Siti Aminah"; phone="0987654321"; vote=""}; };
        case 2 { return {id=3; name="Budi Raharjo"; phone="1122334455"; vote=""}; };
        case 3 { return {id=4; name="Dewi Sartika"; phone="2233445566"; vote=""}; };
        case _ { return {id=5; name="Eko Prasetyo"; phone="3344556677"; vote=""}; };
      }
    });

    public func get_voters() : async List.List<Voter> {
        return voters;
    };

    // Fungsi untuk mendapatkan informasi voter berdasarkan ID
    public func get_voter_by_id(voter_id: Nat) : async ?Voter {
        return List.find<Voter>(voters, func (v: Voter) : Bool { v.id == voter_id });
    };
};
