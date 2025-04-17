import XCTest
import SwiftTreeSitter
import TreeSitterSognasm

final class TreeSitterSognasmTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_sognasm())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Sognasm grammar")
    }
}
