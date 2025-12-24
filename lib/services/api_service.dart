import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = "http://192.168.1.8:3000";

  // Report Disaster API
  static Future<bool> reportDisaster({
    required String name,
    required String description,
    required double latitude,
    required double longitude,
  }) async {
    final url = Uri.parse("$baseUrl/sos/report");

    final response = await http.post(
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonEncode({
        "name": name,
        "description": description,
        "latitude": latitude,
        "longitude": longitude,
      }),
    );

    return response.statusCode == 200;
  }
}
