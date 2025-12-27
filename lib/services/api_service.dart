import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  // 🔴 CHANGE THIS to your deployed backend URL
  static const String baseUrl =
      "https://YOUR-BACKEND.onrender.com";

  static Future<Map<String, dynamic>?> reportDisaster({
    required String message,
    required String location,
    required int peopleAffected,
  }) async {
    try {
      final response = await http.post(
        Uri.parse("$baseUrl/sos"),
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonEncode({
          "message": message,
          "location": location,
          "peopleAffected": peopleAffected,
        }),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        print(
          "API error: ${response.statusCode} ${response.body}",
        );
      }
    } catch (e) {
      print("Network error: $e");
    }

    return null;
  }
}
