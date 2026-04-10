import Time "mo:core/Time";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";

actor {
  type ContactSubmission = {
    name : Text;
    email : Text;
    industry : Text;
    message : Text;
    timestamp : Time.Time;
  };

  let contactSubmissions = List.empty<ContactSubmission>();

  var pageViews = 0;

  // Adds a new contact form submission and returns the stored submission
  public shared ({ caller }) func addSubmission(name : Text, email : Text, industry : Text, message : Text) : async ContactSubmission {
    let submission = {
      name;
      email;
      industry;
      message;
      timestamp = Time.now();
    };
    contactSubmissions.add(submission);
    submission;
  };

  // Returns all contact form submissions
  public query ({ caller }) func getSubmissions() : async [ContactSubmission] {
    contactSubmissions.toArray();
  };

  // Increments and returns page view counter
  public shared ({ caller }) func incrementCounter() : async Nat {
    pageViews += 1;
    pageViews;
  };

  // Returns current page view count
  public query ({ caller }) func getPageViews() : async Nat {
    pageViews;
  };
};
