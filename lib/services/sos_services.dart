
    import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

class SosService {
  // 🔁 Platform base URLs
  // Android Emulator → http://10.0.2.2:3000
  // iOS Simulator / Web → http://localhost:3000
  static const String baseUrl = "http://10.0.2.2:3000";

  /// ======================================
  /// TEXT-ONLY SOS (NLP + TensorFlow text)
  /// ======================================
  static Future<Map<String, dynamic>?> sendTextSOS({
    required String message,
    required int peopleAffected,
    String? location,
  }) async {
    try {
      final response = await http.post(
        Uri.parse("$baseUrl/sos"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "message": message,
          "peopleAffected": peopleAffected,
          "location": location ?? "",
        }),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
    } catch (e) {
      print("Text SOS Error: $e");
    }
    return null;
  }

  /// ======================================
  /// IMAGE / VIDEO SOS (ML + TensorFlow CV)
  /// ======================================
  static Future<Map<String, dynamic>?> sendMediaSOS({
    File? image,
    File? video,
    String? message,
    int peopleAffected = 0,
    String? location,
  }) async {
    try {
      final request =
          http.MultipartRequest("POST", Uri.parse("$baseUrl/sos"));

      // 🔹 Text fields
      if (message != null) request.fields["message"] = message;
      request.fields["peopleAffected"] = peopleAffected.toString();
      if (location != null) request.fields["location"] = location;

      // 🔹 Image upload
      if (image != null) {
        request.files.add(
          await http.MultipartFile.fromPath(
            "image",
            image.path,
          ),
        );
      }

      // 🔹 Video upload
      if (video != null) {
        request.files.add(
          await http.MultipartFile.fromPath(
            "video",
            video.path,
          ),
        );
      }

      final streamedResponse = await request.send();
      final response =
          await http.Response.fromStream(streamedResponse);

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
    } catch (e) {
      print("Media SOS Error: $e");
    }
    return null;
  }
}
