package com.tbsc.search;

import com.tbsc.search.SearchResultDto;
import com.tbsc.search.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/search")
    public Map<String, List<SearchResultDto>> search(@RequestParam("title") String title) {
        return searchService.searchAll(title);
    }
}
