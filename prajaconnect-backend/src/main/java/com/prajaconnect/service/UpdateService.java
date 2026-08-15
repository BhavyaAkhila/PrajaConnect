package com.prajaconnect.service;

import com.prajaconnect.dto.UpdateRequest;
import com.prajaconnect.model.Update;
import com.prajaconnect.model.User;
import com.prajaconnect.repository.UpdateRepository;
import com.prajaconnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UpdateService {

    @Autowired
    private UpdateRepository updateRepository;

    @Autowired
    private UserRepository userRepository;

    public Update createUpdate(UpdateRequest request, String userEmail) {
        User author = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Update update = new Update();
        update.setTitle(request.getTitle());
        update.setBody(request.getBody());
        update.setImage(request.getImage());
        update.setAuthor(author);
        return updateRepository.save(update);
    }

    public List<Update> getAllUpdates() {
        return updateRepository.findAllByOrderByCreatedAtDesc();
    }
}
