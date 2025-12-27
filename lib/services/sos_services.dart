import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

class SosService {
  static const String baseUrl = "http://10.0.2.2:3000"; 
  // Android emulator → localhost
  // iOS simulator → http://localhost:3000

  static Future<Map<String, dynamic>> sendTextSOS({
    required String message,
    required int peopleAffected,
  }) async {
    final response = await http.post(
      Uri.parse("$baseUrl/sos"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({
        "message": message,
        "peopleAffected": peopleAffected
      }),
    );

    return jsonDecode(response.body);
  }

  static Future<Map<String, dynamic>> sendMediaSOS({
    File? image,
    File? video,
    String? message,
    int peopleAffected = 0,
  }) async {
    final request =
        http.MultipartRequest("POST", Uri.parse("$baseUrl/sos"));

    if (message != null) {
      request.fields["message"] = message;
    }

    request.fields["peopleAffected"] = peopleAffected.toString();

    if (image != null) {
      request.files.add(
        await http.MultipartFile.fromPath("image", image.path),
      );
    }

    if (video != null) {
      request.files.add(
        await http.MultipartFile.fromPath("video", video.path),
      );
    }

    final streamedResponse = await request.send();
    final response =
        await http.Response.fromStream(streamedResponse);

    return jsonDecode(response.body);
  }
}
